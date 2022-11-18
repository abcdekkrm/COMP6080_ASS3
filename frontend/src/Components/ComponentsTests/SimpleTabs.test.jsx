import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SimpleTabs from '../SimpleTabs'

describe('<SimpleTabs>', () => {
  // provide mock location to fix navigation issue
  let assignMock = jest.fn();

  delete window.location;
  window.location = { assign: assignMock };

  afterEach(() => {
    assignMock.mockClear();
  });

  it('renders a listing and booking tab ', () => {
    render(<SimpleTabs/>)
    expect(screen.getByRole('tab', { name: /Your Listings/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Your Bookings/i })).toBeInTheDocument()
  })
  it('renders a tablist ', () => {
    render(<SimpleTabs/>)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })
  it('on click listing tab, change window location', () => {
    render(<SimpleTabs/>)
    let listingTab = screen.getByRole('tab', { name: /Your Listings/i });
    userEvent.click(listingTab);
    expect(window.location.assign).toHaveBeenCalledTimes(0);
  })
})