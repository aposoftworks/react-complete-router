Guards are a powerful way os customizing RCR without touching it's source code. But what are they?

## About
They are simple functions that the router will run when the route requires them, they can generate data for the route's to component or simply block it's render. Even the path prop is an actual guard, meaning you can overwrite it's behaviour if you may wish.

There are two ways of using them, non priority guards and priority guards, only priority guards will throw warnings if not found. Check out usage to see how to use them.

## Usage

### Non priority guards

``` jsx
<Route gaurdaname={guardparameter} />
```

As you can see, a guard acts basically as a prop, meaning that if you just would want to pass it to the child component and not use it as a guard, you may do so.

### Priority guards

``` jsx
<Route guard={["guardname:guardargument"]} />
```

The guard prop can take an string array or just a string.

## Default guards

### path
Yes, the path algorythm is a guard, meaning that you can overwrite it. It takes one argument that is the actual path that you are requesting. If any dynamic parameters are found, they will be injected inside of the route's child component.

### when
This is a simple validation that takes an object that will be converted to a boolean for the test.

### guest
This guard will check in the router component for a prop called auth, if its equals from false/null, it will pass.

### logged
Just as guest guard, this will check for auth in router's props and will only pass if it's different from false/null.

### title
Updates the browser page when the route is applied, becareful to not stack those, since they will override one another.