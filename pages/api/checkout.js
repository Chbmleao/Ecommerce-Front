import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import {Product} from "@/models/Product";

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
    products,
  } = req.body;

  const productsIds = JSON.parse(products);
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
        unit_amount: productInfo.price * quantity,
      },
      quantity,
    });
  }

  const orderDoc = await Order.create({
    name: userName,
    email: userEmail,
    city: userCity,
    postalCode: userPostalCode,
    streetAddress: userStreetAddress,
    country: userCountry,
    line_items,
  });

  res.json({line_items});
}