import { isContractNotFoundError } from '../errors';

describe('isContractNotFoundError', () => {
  it('detects Soroban missing-value host errors', () => {
    expect(isContractNotFoundError({ message: 'HostError: MissingValue' })).toBe(true);
    expect(isContractNotFoundError({ data: { message: 'HostError MissingValue' } })).toBe(true);
    expect(isContractNotFoundError({ code: 'CONTRACT_NOT_FOUND' })).toBe(true);
    expect(isContractNotFoundError(new Error('Contract not found'))).toBe(true);
  });

  it('does not classify authorization or signature failures as missing contracts', () => {
    expect(isContractNotFoundError({ message: 'HostError MissingValue: unauthorized' })).toBe(false);
    expect(isContractNotFoundError(new Error('signature verification failed'))).toBe(false);
    expect(isContractNotFoundError({ code: 'TX_BAD_AUTH', message: 'authorization failed' })).toBe(false);
  });

  it('returns false for unrelated errors', () => {
    expect(isContractNotFoundError(new Error('network timeout'))).toBe(false);
    expect(isContractNotFoundError(null)).toBe(false);
  });
});
