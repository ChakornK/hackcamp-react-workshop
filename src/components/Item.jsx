import { memo } from "react";

export const Item = memo(
  ({ itemKey, setItems, name, image }) => {
    return (
      <div className="tier-item">
        <button className="delete-item" type="button" onClick={() => setItems((items) => items.filter((item) => item.key !== itemKey))}>
          X
        </button>
        <img src={image} alt={name} draggable={false} />
        {name}
      </div>
    );
  },
  () => true
);
