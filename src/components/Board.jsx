function Square({ value }) {
  return (
    <button className="bg-white border border-gray-300 h-12 w-12 m-1 text-lg leading-9">
      {value}
    </button>
  );
}
export default function Board() {
  return (
    <>
      <div>
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div>
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div>
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
