export default function Stats({ items }) {
  if (!items.length) return <div className="stats">lets Start packing 🚀</div>;
  const itemsNum = items.length;
  const totalItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((totalItems / itemsNum) * 100);
  return (
    <footer className="stats">
      {percentage === 100 ? (
        "You are ready to go ✈"
      ) : (
        <em>
          👜 You have {itemsNum} items on your list, and you already packed{" "}
          {totalItems} ({percentage}%)
        </em>
      )}
    </footer>
  );
}
