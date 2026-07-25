fetch('https://api.kaajofficial.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'query { products(first: 5, where: { status: "publish" }) { nodes { name slug image { sourceUrl } } } }' })
})
.then(r => r.json())
.then(d => console.log(JSON.stringify(d, null, 2)))
.catch(console.error);
