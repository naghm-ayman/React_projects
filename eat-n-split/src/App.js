import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendArr, serFriendArr] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    serFriendArr((friendArr) => [...friendArr, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    serFriendArr(
      friendArr.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);

  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendArr={friendArr}
          onSelect={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "ADD Friends"}
        </Button>
      </div>

      <FormSplitBill selectedFriend={selectedFriend} onSplit={handleSplitBill}/>
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FriendsList({ friendArr, onSelect, selectedFriend }) {
  return (
    <ul>
      {friendArr.map((friend) => (
        <Friends
          friendsObj={friend}
          onSelect={onSelect}
          selectedFriend={selectedFriend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}
function Friends({ friendsObj, onSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friendsObj.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friendsObj.image} alt={friendsObj.name} />
      <h3>{friendsObj.name}</h3>
      {friendsObj.balance > 0 && (
        <p className="green">
          {friendsObj.name} Owes you a ${Math.abs(friendsObj.balance)}
        </p>
      )}
      {friendsObj.balance < 0 && (
        <p className="red">
          You owes {friendsObj.name} a ${Math.abs(friendsObj.balance)}
        </p>
      )}
      {friendsObj.balance === 0 && <p>You and {friendsObj.name} are even</p>}
      <Button onClick={() => onSelect(friendsObj)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?=${id}`, id, balance: 0 };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👭Friend Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📸Image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend,  onSplit }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const friendExpense = bill ? bill - userExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  if (!selectedFriend) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpense) return;
      onSplit(whoIsPaying === "user" ? friendExpense : -userExpense);

  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>
      <label>💰 Bill Value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🙆‍♀️ Your expense </label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => setUserExpense(Number(e.target.value))}
      />

      <label>🙋‍♂️ {selectedFriend.name}`s expense </label>
      <input type="text" value={friendExpense} disabled />

      <label>🤑 Who is PAYING today?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Spill Pill</Button>
    </form>
  );
}
