* index.js

<main className="...">
  {loading ? (
    <p>Carregando...</p>
  ) : error ? (
    <p>{error}</p>
  ) : produtos.length > 0 ? (
    produtos.map((produto) => <CardProduto key={produto.id} produto={produto} />)
  ) : (
    <p>Nenhum item disponível no momento.</p>
  )}
</main>

Se está carregando → mostra “Carregando...”
Se houve erro → mostra a mensagem de erro
Se há produtos → renderiza os cards
Se não há produtos → mostra “Nenhum item disponível”

///////////////////////////////////