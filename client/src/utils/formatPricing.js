export default function formatPricing(price) {
  return `R$ ${price.toFixed(2)}`.replace(".", ",");
}
