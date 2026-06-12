import { useEffect, useState } from "react";

export default function Profile({ wallet, likes, nfts }) {
  const [likedNFTs, setLikedNFTs] = useState([]);

  useEffect(() => {
    const list = nfts.filter(nft => likes[nft.id] > 0);
    setLikedNFTs(list);
  }, [likes, nfts]);

  return (
    <div style={styles.page}>
      <h1>👤 Profile</h1>

      <div style={styles.box}>
        <p><b>Wallet:</b></p>
        <p>{wallet || "Not connected"}</p>
      </div>

      <h2>❤️ Liked NFTs</h2>

      <div style={styles.grid}>
        {likedNFTs.length === 0 && <p>No NFTs liked yet</p>}

        {likedNFTs.map(nft => (
          <div key={nft.id} style={styles.card}>
            <img src={nft.img} style={styles.img} />
            <h3>{nft.name}</h3>
            <p>{nft.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: 20,
    color: "white",
    background: "#0b0f1a",
    minHeight: "100vh",
    fontFamily: "Arial"
  },
  box: {
    background: "#111827",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20
  },
  card: {
    background: "#111827",
    padding: 10,
    borderRadius: 10
  },
  img: {
    width: "100%",
    borderRadius: 8
  }
};
