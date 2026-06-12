import { useState } from "react";

export default function App() {
  const [likes, setLikes] = useState({});
  const [wallet, setWallet] = useState(null);

  const nfts = [
    {
      id: 1,
      name: "Cyber Ape",
      price: "0.5 ETH",
      img: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c"
    },
    {
      id: 2,
      name: "Neon Punk",
      price: "1.2 ETH",
      img: "https://images.unsplash.com/photo-1633189712230-24f1c8c1b6c3"
    },
    {
      id: 3,
      name: "AI Robot",
      price: "0.8 ETH",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
    },
    {
      id: 4,
      name: "Space Drip",
      price: "2.0 ETH",
      img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
    }
  ];

  const like = (id) => {
    setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
  };

  const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWallet(accounts[0]);
    } catch (err) {
      alert("Wallet connection failed");
    }
  } else {
    alert("Please install MetaMask");
  }
};

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>NFT WORLD 🚀</h2>

        <button onClick={connectWallet} style={styles.walletBtn}>
          {wallet ? wallet : "Connect Wallet"}
        </button>
      </div>

      {/* TITLE */}
      <div style={{ marginTop: 20 }}>
        <h1>Explore Digital Assets</h1>
        <p style={{ opacity: 0.6 }}>
          Buy • Sell • Collect NFTs
        </p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {nfts.map((nft) => (
          <div key={nft.id} style={styles.card}>
            <img src={nft.img} style={styles.img} />

            <h3>{nft.name}</h3>
            <p>{nft.price}</p>

            <button
              onClick={() => like(nft.id)}
              style={styles.likeBtn}
            >
              ❤️ {likes[nft.id] || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0b0f1a",
    color: "white",
    minHeight: "100vh",
    padding: 20,
    fontFamily: "Arial"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  walletBtn: {
    padding: "8px 12px",
    background: "#2563eb",
    border: "none",
    borderRadius: 8,
    color: "white",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20,
    marginTop: 30
  },
  card: {
    background: "#111827",
    padding: 15,
    borderRadius: 12,
    border: "1px solid #222"
  },
  img: {
    width: "100%",
    height: 140,
    objectFit: "cover",
    borderRadius: 10
  },
  likeBtn: {
    marginTop: 10,
    padding: "6px 10px",
    background: "#1d4ed8",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer"
  }
};
