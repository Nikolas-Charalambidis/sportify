# Contributing

## Flow
1. Checkout `dev` and `pull` from the origin.
2. Checkout your `feature/xxx` branch and merge updated `dev` into `feature/xxx`. Resolve the conflicts if required.
3. Develop, commit and push to the origin.
4. Open a pull request, which is available upon pushing to the origin in the yellow panel. You can always create a pull request in any case from `feature/xxx` into `dev`.
5. Wait until the [Travis](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) CI checks pass and press "Merge".
6. Check if the changed files were updated and the `dev` branch and the CI is green for the `dev` branch.
7. Go to the step `1.` until we finish. :)

## Rule of thumb
The `feature/xxx` branches can be red, the `dev` branch cannot. Why? All are dependant on the `dev` branch which we merge into our `feature/xxx` branches regularly to avoid possible immerse merge conflicts. If the `dev` is red (failing), we are forced to not rely on this branch and only on our own, which is wrong.

- Make sure `yarn build` executes successfully. This is run on the Travis CI server as well.
- Run `yarn start` on **Frontend** or/and `yarn dev` on **Backend** and verify the correct behavior of the build.

## Warning :warning:
If the Travis CI build fails for a reason `npm` or another component cannot be downloaded (slow servers), the build fails.  Ask me out to trigger the build manually again or merge manually into `dev` or do by yourself if you are 100 % sure the build passes (no errors, no warnings)and  take full responsibility for the state of the `dev` branch. For this reason, I decided to leave the `dev` branch unlocked for the direct commits and merges.
