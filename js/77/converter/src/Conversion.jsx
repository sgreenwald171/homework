export default function Conversion({rate, amount, from, to, date}) {
  return (
    <>
      <h1>{amount} {from} = {rate && `${rate * amount} ${to}`}</h1>
      <h1>1 {from} = {rate} {to}</h1>
      <h1>rate as of {date}</h1>
    </>
  )
}
