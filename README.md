# GHA Simple Coverage

This action extracts the coverage data in lcov files in order to determine if a build should pass or fail

## Usage

Just add the following to a gha job definition

```yaml
uses: bigmeech/gha-simple-coverage@master
with:
  lcov-file-path: "path/to/lcov.info"
  fail-if-below: 70
```

## Required Inputs

The following Inputs Are required

| Name           | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| lcov-file-path | Path to the lcov file. Relative to the root directory of the project |
| fail-if-below  | Coverage threshold (expressed in percentages)                        |
