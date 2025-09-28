export default function Item({ items, onDeleteItem, onCheckBox }) {
  return (
    <li>
      <input
        type="checkbox"
        value={items.packed}
        onChange={() => onCheckBox(items.id)}
      />
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.quantity} {items.description}
      </span>
      <button onClick={() => onDeleteItem(items.id)}>❌</button>
    </li>
  );
}
