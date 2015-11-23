import Events from './events';
import Cards from './cards';
import Entity from './entity';

class GameEventManager {
  constructor(adapter) {
    this.adapter = adapter;
    this.entities = [];
  }
  opponentCardPlayed(cardId) {
    var card = Cards.getById(cardId);
    if (card) {
      this.adapter.emit(Events.OPPONENT_CARD, Object.assign({}, card));
    }
  }
  playerCardDrawn(cardId) {
    var card = Cards.getById(cardId);
    if (card) {
      this.adapter.emit(Events.PLAYER_CARD, Object.assign({}, card));
    }
  }
  gameStarted() {
    this.adapter.emit(Events.GAME_STARTED);
  }
  playerHero(cardId) {
    var card = Cards.getById(cardId);
    if (card) {
      this.adapter.emit(Events.PLAYER_HERO, Object.assign({}, card));
    }
  }
  opponentHero(cardId) {
    var card = Cards.getById(cardId);
    if (card) {
      this.adapter.emit(Events.OPPONENT_HERO, Object.assign({}, card));
    }
  }
  addEntityById(id) {
    this.entities[id] = new Entity(id);
    console.log('adding entity ID', id);
    return this.entities[id];
  }
  addEntity(entity) {
    this.entities[entity.id] = entity;
    console.log('adding entity object', entity);
    return this.entities[entity.id];
  }
  hasEntity(id) {
    return !!this.entities[id];
  }
  getEntity(id) {
    return this.entities[id];
  }
  safeAddEntity(id) {
    if (!this.entities[id]) {
      this.entities[id] = new Entity(id);
    }
    return this.entities[id];
  }
}

export default GameEventManager;
