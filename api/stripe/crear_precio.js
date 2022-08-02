const stripe = require('stripe')('sk_test_51LOR12JpvP3IgchRt9IdabyiBTlyHGCy3XhULAyOaBkowxVBbo0SUopoIOQJNbN8EfELi3hBqHKSBflDBPcGPHpT005Hm09Fgn');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});