(function(factory){
  if ( typeof define === 'function' && define.amd ){
    // AMD. Register as an anonymous module.
    define( ['jquery'], factory );
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function( $ ){
  'use strict';

  $.fn.rowExpand = function( options ){
    var $this = this;
    var $body = $( document.body );

    var defaults = {
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
    };

    options = $.extend( {}, defaults, options );

    if ( typeof options.template !== 'function' )
    if ( !options.srcElement ){
      throw new Error('Must provide `template` or `srcElement` properties');
    }

    if ( typeof options.srcElement === 'string' ){
      options.srcElement = $( options.srcElement );
    }

    var plugin = {
      $this: $this

    , init: function(){
        return plugin;
      }

    , getColSpan: function(){
        return $this.find('td').length;
      }

    , toggle: function(){
        if ( plugin.$wrapper ){
          return plugin.collapse();
        }

        return plugin.expand();
      }

    , expand: function(){
        var initialHeight;

        plugin.collapse();

        plugin.$wrapper = $(
          options.insertHTML.replace( '{{colspan}}', plugin.getColSpan() )
        );

        if ( options.wrapTarget ){
          plugin.$wrapper.find( options.wrapTarget ).html( plugin.getInnerHTML() );
          plugin.$wrapper.find( options.wrapTarget ).css( options.targetCss );
        } else {
          plugin.$wrapper.html( plugin.getInnerHTML() );
        }

        plugin.$wrapper.css(
          $.extend( options.wrapperPreCSS, { position: 'absolute' } )
        );

        $this.after( plugin.$wrapper );

        initialHeight = plugin.$wrapper.height() + 'px';

        plugin.$wrapper.css({
          height:   0
        , position: 'static'
        });

        setTimeout( function(){
          plugin.$wrapper[ options.animate ? 'animate' : 'css' ](
            $.extend( options.wrapperPostCSS, { height: initialHeight } )
          );
        }, 1 );

        return plugin;
      }

    , collapse: function(){
        if ( plugin.$wrapper ){
          var $el = plugin.$wrapper;
          var cleanup = function(){
            $el.remove();
          };

          $el[ options.animate ? 'animate' : 'css' ](
            $.extend( options.wrapperPreCSS, { height: 0 } )
          , options.animate ? cleanup : null
          );

          if( !options.animate ) cleanup();

          delete plugin.$wrapper;
        }

        return plugin;
      }

    , getInnerHTML: function(){
        if ( options.template ) return options.template();
        return options.srcElement.html();
      }
    };

    return plugin.init();
  };
}));