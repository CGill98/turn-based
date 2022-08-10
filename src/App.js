import Layout from './components/Layout.js';
import CharStats from './components/CharStats';
import Enemy from './components/Enemy';
import Zone from './components/Zone';
import generateZone from './scripts/generateZone';

function App() {
  return (
    <Layout>
      <div style={{ fontSize: 22 }}>TURN BASED ADVENTURE</div>
      <CharStats />
      <Enemy />
      <Zone zone={generateZone()} />
    </Layout>
  );
}

export default App;
