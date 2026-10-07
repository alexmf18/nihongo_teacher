import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { SentenceBuilder } from '../../../presentation/components/SentenceBuilder'

describe('SentenceBuilder', () => {
  const chunks = ['わたし', 'は', 'がくせい', 'です。']

  it('submits the chunks in the order they were placed', () => {
    const onSubmit = jest.fn()
    render(<SentenceBuilder chunks={chunks} disabled={false} onSubmit={onSubmit} />)

    const check = screen.getByRole('button', { name: 'Comprobar' })
    expect(check).toBeDisabled()

    chunks.forEach((chunk) => fireEvent.click(screen.getByRole('button', { name: chunk })))
    expect(check).toBeEnabled()

    fireEvent.click(check)
    expect(onSubmit).toHaveBeenCalledWith('わたしはがくせいです。')
  })

  it('returns a placed chunk to the bank when clicked again', () => {
    render(<SentenceBuilder chunks={chunks} disabled={false} onSubmit={jest.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'わたし' }))
    // Now only the placed copy is accessible; clicking it removes it.
    fireEvent.click(screen.getByRole('button', { name: 'わたし' }))

    expect(screen.getByText('Toca los bloques en orden')).toBeInTheDocument()
  })

  it('hides the actions once answered', () => {
    render(<SentenceBuilder chunks={chunks} disabled onSubmit={jest.fn()} />)
    expect(screen.queryByRole('button', { name: 'Comprobar' })).not.toBeInTheDocument()
  })
})
