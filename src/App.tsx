import { JsonExplorer } from './components/json-explorer';

const demoJson = {
  date: '2021-10-27T07:49:14.896Z',
  hasError: false,
  fields: [
    {
      id: '4c212130',
      prop: 'iban',
      value: 'DE81200505501265402568',
      hasError: false,
    },
  ],

  // Your demo data did not include a null field, very sneaky ;)
  nullField: null,
};

const rootElement = 'res';

function App() {
  return (
    <div>
      <h1>Nicholas Evans - JSON Explorer Challenge</h1>
      <JsonExplorer json={demoJson} rootElement={rootElement} />
    </div>
  );
}

export default App;
