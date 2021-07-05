type IMessageIDDTO =
  | `false_${number}@c.us_${string}`
  | `false_${number}-${number}@g.us_${string}`
  | `true_${number}@c.us_${string}`
  | `true_${number}-${number}@g.us_${string}`;

export default IMessageIDDTO;
