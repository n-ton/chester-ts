// run 'mocha spec.js'
// |
// spawn child process
// |
// |--------------> inside child process
//   process and apply options
//   |
//   run spec file/s
//   |
//   |--------------> per spec file
//     suite callbacks (e.g., 'describe')

// import { expect, assert } from 'chai'

//     |
// describe.skip('describe 1', () => {
//     console.log('describe all 1')
//     describe('describe 2', () => {
//         console.log('describe all 2');
//         before(() => console.log('before all 0')) // skipped
//     })
//     before(() => console.log('before all 00')) // skipped
// })
// describe.skip('describe 3', () => console.log('describe all 3'))
//     |
//     'before' root-level pre-hook
//     |
//     'before' pre-hook
//     |
// before(() => { console.log('before all 1 root-level'); before(() => console.log('before all 1')) })
// before(() => console.log('before all 2 root-level'))
// before(() => { console.log('before all 3 root-level'); beforeEach(() => console.log('before each 31')) })
//     |--------------> per test
//       'beforeEach' root-level pre-hook
//       |
//       'beforeEach' pre-hook
//       |
// beforeEach(() => { console.log('before each 1 root-level'); beforeEach(() => console.log('before each 11')) })
// beforeEach(() => console.log('before each 2 root-level'))
//       test callbacks (e.g., 'it')
//       |
// it.skip('check sum', () => {
//     let a: number = 2;
//     let b: number = 1;
//     expect(a).is.lessThan(b);
// })

//       'afterEach' post-hook
//       |
//       'afterEach' root-level post-hook
// afterEach(() => { console.log('after each 1 root-level')})
// afterEach(() => console.log('after each 2 root-level'))
//     |<-------------- per test end
//     |
//     'after' post-hook
//     |
//     'after' root-level post-hooks
// after(() => { console.log('after 1 root-level')})
// after(() => console.log('after 2 root-level'))
//   |<-------------- per spec file end
// |<-------------- inside child process end
