import { Item } from "./Item";

//// I made this for us so we can speed up the workshop :)
function Tier({ name, color, items, setItems }) {
  return (
    <div className="tier">
      <div
        style={{
          background: color,
        }}
        className="tier-header"
      >
        <h1>{name}</h1>
      </div>
      <div className="tier-items">
        {items.map((item) => (
          <Item key={item.key} itemKey={item.key} name={item.name} image={item.image} setItems={setItems} />
        ))}
      </div>
    </div>
  );
}

export default Tier;
