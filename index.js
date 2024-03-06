// matches

const ANY = 'any';
const ONE = 'one';

// operators

const IN = 'in';
const IS = 'is';

export class Fetta {
  constructor(slices, $env = process.env.NODE_ENV) {
    this.$env = $env;
    this.slices = slices || [];
  }

  createCheck(data) {
    return ([property = '', operator = '', value = null] = []) => {
      if (!property || !operator) return false;

      switch (operator) {
        case IN:
          return value.includes(data[property]);
        case IS:
          return data[property] === value;
        default:
          return false;
      }
    };
  }

  resolve(data = {}, originalValue = data) {
    return this.slices
      .filter(({ $env = null, conditions = [], match = ANY, ...slice }) => {
        if ($env && this.$env !== $env) return false;

        const check = this.createCheck(data);

        switch (match) {
          case ONE:
            return conditions.filter(check).length === 1;
          case ANY:
          default:
            return conditions.length === 0 ? true : !!conditions.find(check);
        }
      })
      .reduce((acc, { value }) => ({ ...acc, ...value }), originalValue);
  }
}
