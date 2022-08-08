

function MemoryCard({item}) {
    const {id, title, excerpt} = item
    console.log('Memories', item)
  return (
    <div className="bordercontainer px-2">
        <h3 className="h3">{title}</h3>
        <p>{excerpt}</p>
    </div>
  )
}

export default MemoryCard