import { useState } from "react";

export default function App() {
  const [likes, setLikes] = useState({});

  const nfts = [
    { id: 1, name: "Cyber Ape", price: "0.5 ETH" },
    { id: 2, name: "Neon Punk", price: "1.2 ETH" },
    { id: 3, name: "AI Robot", price: "0.8 ETH" },
    { id: 4, name: "Space Drip", price: "2.0 ETH" }
  ];

  const like = (id) => {
    setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
  };

  return (
    <div style={{ background: "#0b0f1a", minHeight: "100vh", color: "white", padding: 20 }}>
      <h1>NFT WORLD 🚀</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 20 }}>
        {nfts.map(nft => (
          <div key={nft.id} style={{ background: "#111", padding: 15, borderRadius: 10 }}>
            <h3>{nft.name}</h3>
            <p>{nft.price}</p>
            <button onClick={() => like(nft.id)}>
              ❤️ {likes[nft.id] || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
