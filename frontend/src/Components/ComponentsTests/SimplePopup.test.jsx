import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SimplePopup from '../SimplePopup'

describe('<SimplePopup>', () => {
  // provide mock location to fix navigation issue
  let assignMock = jest.fn();

  delete window.location;
  window.location = { assign: assignMock };

  afterEach(() => {
    assignMock.mockClear();
  });

  const text = 'hi'
    
  it('renders an popup with a close button', () => {
    render(<SimplePopup closePopup={() => setOpen(false)} />)
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument()
  })
  it('renders an text inside the popup', () => {
    render(<SimplePopup text={text} closePopup={() => setOpen(false)} />)
    expect(screen.getByText(/hi/i)).toBeInTheDocument();
  })
})
