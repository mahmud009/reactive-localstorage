import { useLocalStorage } from "src/hooks/useLocaStorage";

export function CompA() {
  const handleUpdate = () => {
    let current = 0;
    const storageValue = window.localStorage.getItem("foo");
    if (storageValue?.counter) current = storageValue.counter;
    window.localStorage.setItem("foo", { counter: current + 1 });
  };

  const handleClear = () => {
    window.localStorage.removeItem("foo");
  };

  return (
    <div>
      <button onClick={handleUpdate}>Update Storage</button>
      <button onClick={handleClear}>Clear Storge</button>
    </div>
  );
}
