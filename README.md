# jQuery Row Expand

Adds a row after the target table row with a `td` whose colspan is set to the parent tables number of columns. The `tr > td` that is added has a `padding: 0` value so you can insert your own HTML without having to worry about much external CSS

![Row Expander](http://storage.j0.hn/row-expander.gif)

__Install:__

```
bower install jquery.row-expand
```

__Usage:__

```html
<button class="toggle">Toggle!</button>
<table>
  <tr>
    <td>Data 1<td>
    <td>Data 2<td>
  </tr>
  <tr class="expandable">
    <td>Data 1<td>
    <td>Data 2<td>
  </tr>
  <tr>
    <td>Data 1<td>
    <td>Data 2<td>
  </tr>
</table>
```

```javascript
$(function(){
  var rowExpander = $('.expandable').rowExpand({
    template: function(){
      return [
        '<div class="expanded-row">'
      , '  <h2>Ohai!</h2>'
      , '</div>'
      ].join('\n');
    }
  });

  $('.toggle').click( rowExpander.toggle );
});
```

__Options and Defaults:__

```javascript
{
  // Markup to insert after target
  insertHTML:     '<tr><td colspan="{{colspan}}"></td></tr>'
  // The Element we're actually concerned with within the insertHTML
, wrapTarget:     'td'
  // Whether or not to use .css() or .animate() when setting properties
, animate:        true
  // Attempt to normalize td's so lib consumer can easily
  // add their own wrapper
, targetCss:      { padding: 0 }
  // Before the wrapper is inserted in DOM, this is the CSS
, wrapperPreCSS:  { opacity: 0, width: '100%' }
  // Once the wrapper element is inserted, add this CSS
, wrapperPostCSS: { opacity: 1 }
  // If you want to use an existing element as your table row extension,
  // then pass a selector or jQuery element here
, srcElement:     null
  // A function to be called when expanding the table row. The returned
  // string will be used as the inner markup for
, template:       null
};
```

## Plugin API

This plugin is intendend to applied one element at a time. It returns an interface for dealing with the plugin in the context of the target element.

#### .expand()

Expands the target table row, adding in the necessary elements.

#### .collapse()

Collapses the target table row, removing the previously added elements.

#### .getInnerHTML()

Returns the HTML returned either by `options.template()` or `$( options.srcElement )` that will be inserted into `options.insertHTML > options.wrapTarget`.

#### .getColSpan()

Returns the number of columns the target's parent table has.