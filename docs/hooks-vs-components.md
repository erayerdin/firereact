# Hooks vs. Components

In this library, you will see *component* equivalents to *hooks*. Both have their merits and demerits.

Components, when compared to hook equivalents;

 - allows you to use a declarative approach
 - rerender only a specific part of a component tree rather than the whole component that the hook is used in
 - mostly rely on *callbacks*, which are easier to reason about but uglier to structure