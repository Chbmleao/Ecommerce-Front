import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import {Product} from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  mongooseConnect();

  const { 
    userName, 
    userEmail, 
    userCity, 
    userPostalCode, 
    userStreetAddress, 
    userCountry,
    productsIds,
  } = req.body;

  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find((p) => p._id.toString() === productId);
    const quantity = productsIds.filter((id) => id === productId).length;
    if (quantity === 0) {
      continue;
    }

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: productInfo.title,
        },
        unit_amount: productInfo.price * 100,
      },
      quantity,
    });
  }

  const orderDoc = await Order.create({
    line_items,
    userName,
    userEmail,
    userCity,
    userPostalCode,
    userStreetAddress,
    userCountry,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: userEmail,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    metadata: {
      orderId: orderDoc._id.toString(),
    },
  });

  res.json({
    url: session.url,
  });
}