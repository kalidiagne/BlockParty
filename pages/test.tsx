const component = () => {
  return (
    <form action="">
      <label htmlFor="t">tests</label>
      <input type="text" />
    </form>
  );
};

export default function Test() {
  return <div>{component()}</div>;
}
