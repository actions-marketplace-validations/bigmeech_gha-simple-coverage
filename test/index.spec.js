describe("index", () => {
  let mockSetFailed, mockSetOutput, mockGetInput;
  beforeEach(() => {
    // set env vars for testing
    process.env.GITHUB_WORKSPACE = '/path/to/github/wkspc'

    // stub actions core methods
    mockSetFailed = jest.fn()
    mockGetInput = jest.fn((arg) => {
      if(arg === 'lcov-file-path') return '/path/to/lcov'
      if(arg === 'fail-if-below') return 80
    })
    mockSetOutput = jest.fn()
    jest.mock('@actions/core', () => {
      return {
        getInput: mockGetInput,
        setFailed: mockSetFailed
      }
    })
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should throw if coverage is below configured threshold", () => {
    require("../src");
    expect(mockSetFailed.mock.calls.length).toBe(1)
  });
});
