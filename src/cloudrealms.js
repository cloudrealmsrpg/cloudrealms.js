import Engine from './engine';
import Game from './game';
import Character from './character/index';
import Map from './map/index';
import Tile from './map/tile';

class CloudRealms extends Engine {}

CloudRealms.Map = Map;
CloudRealms.Map.Tile = Tile;
CloudRealms.Game = Game;
CloudRealms.Character = Character;

window.CloudRealms = CloudRealms;

export default CloudRealms;
