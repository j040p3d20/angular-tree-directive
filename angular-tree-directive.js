
/**
 * angular-tree-directive
 *
 * Copyright (c) 2016 João Domingues j040p3d20@gmail.com
 * https://github.com/j040p3d20
 *
 * License: GPLv3
 */
angular
.module( 'angularTreeDirective' , [] )
/**
 *
 * this directive recusively iterates a tree of data
 * and for each element, renders the appropriate tree
 * node using the transcluded content.
 * 
 * the scope is not isolated so whatever is available
 * outside the directive scope is also available for
 * rendering the transcluded template. 
 * 
 * Attributes :
 * 
 * 		nodes :
 * 			the name of the scope property containing the list of nodes
 * 			to render is passed as attribute "nodes" . While rendering
 * 			each of the nodes with the provided template, the child scope
 * 			will have access to the properties "node" and "depth"
 * 
 */
.directive( 'angularTreeDirective' , function ( $compile , $timeout ) {
	return {
		scope : true,
		transclude : true,
		link : function( scope , element , attrs , controller , transcludeFn ){
			
			scope.$watch( attrs.nodes , function( nodes ) {
				element.empty();
				appendNodes( element , scope , nodes );
			} , true );
			
			function appendNodes( element , scope , nodes )
			{
				if ( nodes && nodes.length )
				{
					for ( var i = 0 ; i < nodes.length ; i++ )
					{
						var node = nodes[i];
						appendNode( element, scope.$new() , node );
					}
				}
			}
			
			function appendNode( element, scope, node )
			{
				scope.node = node;
				scope.depth = ( scope.depth == undefined ? 0 : 1 + scope.$parent.depth );
				
				transcludeFn( scope, function( clone , scope ){
					element.append( $compile( clone )( scope ) );
				} );
				
				if ( node[attrs.nodes] )
				{
					appendNodes( element , scope , node[attrs.nodes] );
				}
			}
			
		}
	}
})
;
