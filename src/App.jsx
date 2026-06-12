import { useState, useEffect } from "react";

export default function App() {
  const [likes, setLikes] = useState({});
  const [wallet, setWallet] = useState(null);
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [nfts, setNfts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    img: ""
  });

  // Load data
  useEffect(() => {
    const savedNFTs = localStorage.getItem("nfts");
    const savedLikes = localStorage.getItem("likes");

    if (savedNFTs) setNfts(JSON.parse(savedNFTs));
    else {
      setNfts([
        { id: 1, name: "Cyber Ape", price: 0.5, img: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c" },
        { id: 2, name: "Neon Punk", price: 1.2, img: "https://images.unsplash.com/photo-1633189712230-24f1c8c1b6c3" },
        { id: 3, name: "AI Robot", price: 0.8, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995" }
      ]);
    }

    if (savedLikes) setLikes(JSON.parse(savedLikes));
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("nfts", JSON.stringify(nfts));
  }, [nfts]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const like = (id) => {
    setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWallet(acc[0]);
    } else {
      alert("Install MetaMask");
    }
  };

  const addNFT = () => {
    if (!form.name || !form.price || !form.img) return;

    const newNFT = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price)
    };

    setNfts([newNFT, ...nfts]);
    setForm({ name: "", price: "", img: "" });
  };

  const filtered = nfts
    .filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  const likedNFTs = nfts.filter(n => likes[n.id] > 0);

  return (
    <div style={styles.page}>

      {/* NAV */}
      <div style={styles.nav}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("profile")}>Profile</button>
      </div>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>NFT WORLD 🚀</h2>

        <button onClick={connectWallet} style={styles.walletBtn}>
          {wallet ? wallet.slice(0,6)+"..."+wallet.slice(-4) : "Connect Wallet"}
        </button>
      </div>

      {/* HOME */}
      {page === "home" && (
        <>
          <input
            placeholder="Search NFT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          {/* ADD NFT */}
          <div style={styles.form}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
            <input
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
            />
            <input
              placeholder="Image URL"
              value={form.img}
              onChange={(e) => setForm({...form, img: e.target.value})}
            />
            <button onClick={addNFT}>Add NFT</button>
          </div>

          {/* SORT */}
          <div style={styles.sort}>
            <button onClick={() => setSort("default")}>Default</button>
            <button onClick={() => setSort("low")}>Low</button>
            <button onClick={() => setSort("high")}>High</button>
          </div>

          {/* GRID */}
          <div style={styles.grid}>
            {filtered.map(nft => (
              <div key={nft.id} style={styles.card}>
                <img src={nft.img} style={styles.img} />
                <h3>{nft.name}</h3>
                <p>{nft.price} ETH</p>
                <button onClick={() => like(nft.id)}>
                  ❤️ {likes[nft.id] || 0}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PROFILE */}
      {page === "profile" && (
        <div>
          <h1>👤 Profile</h1>

          <div style={styles.box}>
            <p>{wallet || "Not connected"}</p>
          </div>

          <h2>❤️ Liked NFTs</h2>

          <div style={styles.grid}>
            {likedNFTs.map(nft => (
              <div key={nft.id} style={styles.card}>
                <img src={nft.img} style={styles.img} />
                <h3>{nft.name}</h3>
                <p>{nft.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page:{background:"#0b0f1a",color:"white",minHeight:"100vh",padding:20},
  nav:{display:"flex",gap:10},
  header:{display:"flex",justifyContent:"space-between"},
  walletBtn:{padding:8,background:"#2563eb",borderRadius:8,color:"#fff"},
  input:{width:"100%",padding:10,marginTop:10},
  form:{display:"grid",gap:8,marginTop:10,marginBottom:10},
  sort:{display:"flex",gap:10,marginBottom:10},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20},
  card:{background:"#111827",padding:15,borderRadius:12},
  img:{width:"100%",height:140,objectFit:"cover",borderRadius:10},
  box:{background:"#111827",padding:15,borderRadius:10}
};
