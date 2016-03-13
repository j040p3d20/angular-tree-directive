
angular
.module( 'angularTreeDirective' , [] )
.directive( 'angularTreeDirective' , function ( $compile , $timeout ) {
	return {
		scope : true,
		transclude : true,
		link : function( scope , element , attrs , controller , transcludeFn ){
			
			scope.$watch( attrs.rows , function( rows ) {
				element.empty();
				scope.open = true;
				appendRows( element , scope , rows );
			});
			
			function appendRows( element , scope , rows )
			{
				if ( rows && rows.length )
				{
					for ( var i = 0 ; i < rows.length ; i++ )
					{
						var row = rows[i];
						appendRow( element, scope.$new() , row );
					}
				}
			}
			
			function appendRow( element, scope, row )
			{
				scope.row = row;
				scope.open = false;
				scope.depth = ( scope.depth == undefined ? 0 : 1 + scope.$parent.depth );
				
				scope.toggle = function(){
					var open = ! this.open;
					$timeout(function(){
						if ( open )
						{
							scope.open = open;
						}
						else
						{
							close( scope );
						}
					},0);
				}
				
				transcludeFn( scope, function( clone , scope ){
					element.append( $compile( clone )( scope ) );
				} );
				
				if ( row.rows )
				{
					appendRows( element , scope , row.rows );
				}
			}
			
			function close( scope )
			{
				if ( scope.$$childHead )
				{
					for ( var child = scope.$$childHead ; child != null ; child = child.$$nextSibling )
					{
						close( child );
					}
				}
				scope.open = false;
			}
			
		}
	}
})
;
