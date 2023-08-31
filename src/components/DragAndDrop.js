
import React, { useEffect, useRef, useState } from 'react';
import { Engine, Runner, Mouse, MouseConstraint, Render, Bodies, Composite, Svg, Composites } from 'matter-js'

const DragAndDrop = () => {
  const scene = useRef();
  const shape = useRef();
  let screenWidth = document.body.clientWidth;
  let screenHeight = document.body.clientHeight;
  let [elementsToShow, updateElementsToShow] = useState(6);

  //boundaries styling
  let wallsOptions = {
    isStatic: true,
    render: {
      fillStyle: '#F5A623',
      strokeStyle: '#F5A623',
      lineWidth: 2
    }
  }

  useEffect(() => {
    if (screenWidth < 800) {
      updateElementsToShow(3);
    }

    // create an engine
    let engine = Engine.create();
    let world = engine.world;

    // create a renderer
    let render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: screenWidth,
        height: 400,
        showVelocity: true,
        wireframes: false,
        background: "transparent",
      }
    });

    // create walls
    Composite.add(world, [
      Bodies.rectangle(0, 400, screenWidth * 2, 10, wallsOptions), //top
      Bodies.rectangle(10, 0, 10, screenHeight, wallsOptions), //left
      Bodies.rectangle(screenWidth - 10, 0, 10, screenHeight - 1, wallsOptions) //right
    ]);


    //setup SVG from file
    let superShape = Svg.pathToVertices(shape.current, 20);

    //create 6x elements
    var stack = Composites.stack((screenWidth / 2 - (103 * elementsToShow)), 20, elementsToShow, 1, 20, 10, function(x, y, i) {
      var color = ['#FFCE50', '#FFCE7E', '#BA7402', '#FFCE50', '#FFCE7E', '#BA7402'];
        
      const vertexSets = []
      var v = Bodies.fromVertices(x, y, superShape, {
        render: {
          fillStyle: color[i],
          strokeStyle: color[i],
          lineWidth: 1,
        }
      }, true);
      vertexSets.push(v);

      return v
    });

    Composite.add(world, stack);

    // mouse events
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
        }
    });

    Composite.add(world, mouseConstraint);

    // run the renderer & engine
    Render.run(render);
    var runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render)
      Engine.clear(engine)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenHeight, screenWidth])

  
  return (
    <section className="drag-and-drop">
      <h1>Drag and drop!</h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="193" height="192" fill="none"><path ref={shape} d="M0 91.993v-5.11c.73-1.616.352-3.347.371-4.995.109-9.084 4.243-16.736 8.557-24.293 3.686-6.458 7.603-12.782 10.17-19.822 1.69-4.644 3.008-9.307 1.99-14.315-.083-.415-.179-.882-.051-1.265.979-2.83 1.344-5.462-.326-8.356-.909-1.565.928-3.43 3.29-3.737 2.765-.351 5.504-.128 8.23.569 4.07 1.041 7.84-.613 9.453-4.452C42.963 3.175 44.922 1.092 48 0h1.92c1.606.76 2.65 1.974 3.43 3.59 1.613 3.335 4.307 5.404 7.904 6.458 3.514 1.028 7.11 1.482 10.707 1.706 9.037.569 17.965 1.437 26.867 3.443 6.547 1.476 13.216 2.197 19.213 5.519 5.785 3.2 10.374 7.455 12.416 13.938.704 2.236 2.048 3.398 4.403 3.373 1.395-.013 2.752.3 4.128.46 4.185.485 8.173.256 12.077-1.853 3.84-2.076 8.096-3.251 12.422-4.018 5.683-1.009 8.883.517 11.603 5.545 2.88 5.327 4.154 11.153 4.935 17.075.326 2.479.921 4.772 2.035 6.988 1.485 2.945 2.995 5.877 4.345 8.886 3.674 8.202 5.12 16.839 5.274 25.756.013.722-.23 1.495.314 2.146v7.027c.339 9.48-6.01 14.45-12.928 18.992-4.186 2.746-4.314 2.995-2.196 7.327 5.088 10.406 7.36 21.482 7.7 32.974.102 3.431.224 6.72 1.811 9.921 1.369 2.766.435 4.28-2.631 5.084-1.056.275-2.156.46-2.553 1.629-.851 2.511-2.842 2.939-5.107 2.894-1.754-.038-3.367.237-4.768 1.437-.64.55-1.479.959-2.349.92-10.375-.453-20.659-.971-25.997-12.271-1.446-3.066-3.238-5.992-4.634-9.09-.953-2.108-2.169-2.344-4.326-1.68-5.498 1.686-8.48 6.183-12.006 10.093-.903.996-.736 2.395-.871 3.66-.307 2.907-1.293 3.871-4.121 3.514-2.132-.269-3.885-.16-5.607 1.373-1.293 1.15-3.046.664-4.582.128-1.466-.518-2.784-.748-4.231.243-1.363.945-2.873.383-4.281-.179-1.594-.639-2.957-1.7-4.493-2.428-3.053-1.443-5.018-.179-5.024 3.188 0 5.283-.557 5.928-5.773 5.391-2.285-.236-3.885.741-5.574 1.853h-1.92c-2.56-.741-5.12-2.306-7.68 0h-1.28c-3.987-.831-5.997-4.587-9.363-6.343-.55-.288-.928-.882-1.888-1.074-1.907 2.434-4.499 2.913-7.507 1.808-.928-.338-1.984-.23-2.714.498-1.818 1.815-3.872 1.546-5.926.709-1.958-.798-3.802-1.047-5.85-.178-1.382.587-2.95.364-4.346-.339-6.995-3.52-13.165-7.685-15.539-15.88-3.686-12.706-4.525-25.271.512-37.804 1.12-2.786 2.65-5.334 4.378-7.768 1.28-1.802.941-3.079-1.069-4.069-2.784-1.361-5.408-2.99-7.706-5.085C3.347 109.835.141 102.891.301 94.452c.013-.818.288-1.706-.301-2.459z" fill="#ffce50"/></svg>

      <div className="draggable-area" ref={scene}></div>

    </section>
  );
}

export default DragAndDrop;
