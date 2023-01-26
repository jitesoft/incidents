# Incidents

Super simple incident report static page.

[Demo](https://jitesoft.github.io/incidents/).

Makes use of GitHub issues to query for incidents, renders GitHub issues markdown
with [showdown](https://github.com/showdownjs/showdown)
and displays the latest 30 as a list.

## Configuration

At the start of the index.html file, a `const config` variable can be found.  
This is all the configuration currently used.

```javascript
const config = {
  "user": "johannestegner",
  "repo": "jitesoft/incidents",
  "baseUri": "https://api.github.com/repos",
  "pagesize": 30
};
```

`baseUri` should be left as is.   
`repo` should be set to the <organization/user>/repository that the page will use for issues.  
`user` should be set to the user which issues from will be displayed on the page (currently only one user is supported).  
`pagesize` is the amount of posts to show.


## Further development

This project is not beautiful, there is a lot that could be done with it, and it's totally okay to modify and 
use as you wish. Pull requests are greatly appreciated.

## License

MIT (check [LICENSE](LICENSE) file).

## Dependencies

Incidents makes use of [showdown](https://github.com/showdownjs/showdown) to render markdown.
