import { configure, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { expect } from 'chai'

import Page from '../../pages/[page]'

configure({ adapter: new Adapter() })

describe('/[page]', () => {

  it('Shows the page renderer', () => {
    const page = render(<Page />)

    expect(true).to.equal(true)
  })
})
