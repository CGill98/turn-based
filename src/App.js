import { useContext, useEffect, useMemo } from 'react';

import Layout from './components/Layout.js';
import CharStats from './components/CharStats';
import Enemy from './components/Enemy';
import Zone from './components/Zone';

import {
  PlayerProvider,
  PlayerContext,
} from './components/contexts/PlayerContext';

import generateZone from './scripts/generateZone';

//no Provider Parents
function InnerApp() {
  const { setPos } = useContext(PlayerContext);
  // const zone = generateZone();
  const zone = useMemo(generateZone, []);

  console.log(zone);
  useEffect(() => {
    for (let i = 0; i < zone.length; i++) {
      for (let j = 0; j < zone[i].length; j++) {
        if (zone[i][j].type === 'ROOM') {
          setPos(j, i);
          break;
        }
      }
    }
  }, [zone]);
  // setPos()
  return (
    <Layout>
      <div style={{ fontSize: 22 }}>TURN BASED ADVENTURE</div>
      <CharStats />
      <Enemy />
      <Zone zone={zone} />
    </Layout>
  );
}

function App() {
  // const { state: player } = useContext(PlayerContext);

  return (
    <PlayerProvider>
      <InnerApp />
      {/*      <Layout>
        <div style={{ fontSize: 22 }}>TURN BASED ADVENTURE</div>
        <CharStats />
        <Enemy />
        <Zone zone={generateZone()} />
      </Layout>*/}
    </PlayerProvider>
  );
}

export default App;
