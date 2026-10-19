import { isInsufficientFee } from '../errors';

describe('isInsufficientFee', () => {
  it('detects fee exhaustion codes and messages', () => {
    expect(isInsufficientFee({ code: 'tx_insufficient_fee' })).toBe(true);
    expect(isInsufficientFee(new Error('BudgetExceeded'))).toBe(true);
    expect(isInsufficientFee({ name: 'BudgetExceededError' })).toBe(true);
    expect(isInsufficientFee('transaction failed: insufficient fee')).toBe(true);
  });

  it('returns false for unrelated and authorization errors', () => {
    expect(isInsufficientFee(new Error('network timeout'))).toBe(false);
    expect(isInsufficientFee({ code: 'TX_BAD_AUTH', message: 'signature invalid' })).toBe(false);
    expect(isInsufficientFee(null)).toBe(false);
  });
});
