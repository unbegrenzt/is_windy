import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ResultsList from './index';

describe('ResultsList', () => {

  it('should render no results when the results array is empty', () => {
    render(<ResultsList results={[]} />);

    expect(screen.queryByRole('button')).toBeNull();
  });
});
