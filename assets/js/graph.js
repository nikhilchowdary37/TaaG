
function initializeGraph(container){
            // -------------------- mxGraph initialization ------------------------------------ //
            // Checks if the browser is supported
            // Defines an icon for creating new connections in the connection handler.
			// This will automatically disable the highlighting of the source vertex.
			mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);
		
			// Checks if browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is
				// not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Creates the div for the toolbar
				var tbContainer = document.getElementById('position-list');
				
				//document.body.appendChild(tbContainer);
			    // Creates new toolbar without event processing
                var toolbar = new mxToolbar(tbContainer);
                toolbar.enabled = false;

				
				
				// Creates the div for the graph
				
				
				// Workaround for Internet Explorer ignoring certain styles
				if (mxClient.IS_QUIRKS)
				{
					document.body.style.overflow = 'hidden';
					new mxDivResizer(tbContainer);
					new mxDivResizer(container);
				}
	
				// Creates the model and the graph inside the container
				// using the fastest rendering available on the browser
				var model = new mxGraphModel();
				var graph = new mxGraph(container, model);
				graph.dropEnabled = true;
				
				// Matches DnD inside the graph
				mxDragSource.prototype.getDropTarget = function(graph, x, y)
				{
					var cell = graph.getCellAt(x, y);
					
					if (!graph.isValidDropTarget(cell))
					{
						cell = null;
					}
					
					return cell;
				};
				// Enables new connections in the graph
				graph.setConnectable(true);
				graph.setMultigraph(false);
				// Stops editing on enter or escape keypress
				var keyHandler = new mxKeyHandler(graph);
				var rubberband = new mxRubberband(graph);
				
				var addVertex = function(icon, w, h, style)
				{
					var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
					vertex.setVertex(true);
				
					addToolbarItem(graph, toolbar, vertex, icon, null, null);
				};
                
                
                //UNCOMMENT HERE
				//addVertex($('#position-list').append('<div></div>'), 120, 160, 'shape=rounded;');
				//addVertex($('#position-list').append('<div></div>'), 100, 40, '');
				// addVertex('editors/images/rounded.gif', 100, 40, 'shape=rounded');
				// addVertex('editors/images/ellipse.gif', 40, 40, 'shape=ellipse');
				// addVertex('editors/images/rhombus.gif', 40, 40, 'shape=rhombus');
				// addVertex('editors/images/triangle.gif', 40, 40, 'shape=triangle');
				// addVertex('editors/images/cylinder.gif', 40, 40, 'shape=cylinder');
				// addVertex('editors/images/actor.gif', 30, 40, 'shape=actor');
				//toolbar.addLine();
				
			}
        }


function makeDraggable(){
   $( ".draggable-list" ).sortable();
   //$( ".draggable-list" ).droppable();

    $( "#graphContainer" ).droppable({
        drop: function( event, ui ) {
          $( this )
            .addClass( "dropped" );
            //insertCell(graph, , )
            graph.insertVertex(parent, null, 'CEO,', 20, 20, 80, 30);
        }
      });
}

function addToolbarItem(graph, toolbar, prototype, image, id, position)
		{
			// Function that is executed when the image is dropped on
			// the graph. The cell argument points to the cell under
			// the mousepointer if there is one.
			var funct = function(graph, evt, cell)
			{
				graph.stopEditing(false);
				var pt = graph.getPointForEvent(evt);
				var vertex = graph.getModel().cloneCell(prototype);
				vertex.geometry.x = pt.x;
				vertex.geometry.y = pt.y;
				
				graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
			}
			// Creates the image which is used as the drag icon (preview)
            var img = toolbar.addMode(null, null, funct);
           mxUtils.setTextContent(img, id + ": " + position);
			mxUtils.makeDraggable(img, graph, funct);
		}



	


