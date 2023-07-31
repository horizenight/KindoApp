import React, { useLayoutEffect, useCallback, useEffect, useState, useMemo, useRef } from "react";
import { useMediaQuery, useTheme, VStack, Flex, Box } from "@chakra-ui/react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useBoundingRect } from "../hooks";

const MotionFlex = motion(Flex);

const transitionProps = {
  stiffness: 400,
  type: "spring",
  damping: 60,
  mass: 3
};

const ChakraCarousel = ({ activeItem, setActiveItem, children, gap }) => {
  const [trackIsActive, setTrackIsActive] = useState(false);
  const [multiplier, setMultiplier] = useState(0.35);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [constraint, setConstraint] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  console.log("activeItem", activeItem);

  const initSliderWidth = useCallback((width) => setSliderWidth(width), []);

  const positions = useMemo(() => children.map((_, index) => -Math.abs((itemWidth + gap) * index)), [children, itemWidth, gap]);

  const { breakpoints } = useTheme();

  const [isBetweenBaseAndMd] = useMediaQuery(`(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.md})`);
  const [isBetweenMdAndXl] = useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.xl})`);
  const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`);

  useEffect(() => {
    if (isBetweenBaseAndMd) {
      setItemWidth(sliderWidth - gap);
      setMultiplier(0.65);
      setConstraint(1);
    } else if (isBetweenMdAndXl) {
      setItemWidth(sliderWidth / 2 - gap);
      setMultiplier(0.5);
      setConstraint(2);
    } else if (isGreaterThanXL) {
      setItemWidth(sliderWidth / 3 - gap);
      setMultiplier(0.35);
      setConstraint(3);
    }
  }, [isBetweenBaseAndMd, isBetweenMdAndXl, isGreaterThanXL, sliderWidth, gap]);

  const sliderProps = {
    setTrackIsActive,
    initSliderWidth,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap
  };

  const trackProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    sliderWidth,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
    gap
  };

  const itemProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap
  };

  return (
    <Slider {...sliderProps}>
      <Track {...trackProps}>
        {children.map((child, index) => (
          <Item {...itemProps} index={index} key={index}>
            {child}
          </Item>
        ))}
      </Track>
    </Slider>
  );
};

const Slider = ({
  setTrackIsActive,
  initSliderWidth,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  gap
}) => {
  const [ref, { width }] = useBoundingRect();

  useLayoutEffect(() => initSliderWidth(Math.round(width)), [width, initSliderWidth]);

  const handleClick = useCallback((event) => (event.target.contains(event.target) ? setTrackIsActive(true) : setTrackIsActive(false)), [setTrackIsActive]);

  return (
    <>
      <Box
        ref={ref}
        w={{ base: "100%", md: `calc(100% + ${gap}px)` }}
        ml={{ base: 0, md: `-${gap / 2}px` }}
        px={`${gap / 2}px`}
        position="relative"
        overflow="hidden"
        _before={{
          bgGradient: "linear(to-r, base.d400, transparent)",
          position: "absolute",
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: "100%",
          left: 0,
          top: 0
        }}
        _after={{
          bgGradient: "linear(to-l, base.d400, transparent)",
          position: "absolute",
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: "100%",
          right: 0,
          top: 0
        }}
        onClick={handleClick}
      >
        {children}
      </Box>
    </>
  );
};

const Track = ({
  setTrackIsActive,
  trackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  multiplier,
  itemWidth,
  positions,
  children
}) => {
  const [dragStartPosition, setDragStartPosition] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const node = useRef(null);

  const handleDragStart = () => {
    setDragStartPosition(x.get());
  };

  const handleDragEnd = (_, info) => {
    const distance = info.offset.x;
    const velocity = info.velocity.x * multiplier;
    const direction = velocity < 0 || distance < 0 ? 1 : -1;

    const extrapolatedPosition =
      dragStartPosition +
      (direction === 1 ? Math.min(velocity, distance) : Math.max(velocity, distance));

    const closestPosition = positions.reduce((prev, curr) => {
      return Math.abs(curr - extrapolatedPosition) < Math.abs(prev - extrapolatedPosition) ? curr : prev;
    }, 0);

    const minPosition = positions[positions.length - constraint];

    if (!(closestPosition < minPosition)) {
      setActiveItem(positions.indexOf(closestPosition));
      controls.start({
        x: closestPosition,
        transition: {
          velocity: info.velocity.x,
          ...transitionProps
        }
      });
    } else {
      setActiveItem(positions.length - constraint);
      controls.start({
        x: minPosition,
        transition: {
          velocity: info.velocity.x,
          ...transitionProps
        }
      });
    }
  };

  const handleResize = useCallback(() => {
    controls.start({
      x: positions[activeItem],
      transition: {
        ...transitionProps
      }
    });
  }, [activeItem, controls, positions]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      {itemWidth && (
        <VStack ref={node} spacing={5} alignItems="stretch">
          <MotionFlex
            dragConstraints={node}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x }}
            drag="x"
            _active={{ cursor: "grabbing" }}
            minWidth="min-content"
            flexWrap="nowrap"
            cursor="grab"
          >
            {children}
          </MotionFlex>
        </VStack>
      )}
    </>
  );
};

const Item = ({ setTrackIsActive, setActiveItem, activeItem, constraint, itemWidth, positions, children, index, gap }) => {
  const handleFocus = () => {
    setTrackIsActive(true);
  };

  const handleBlur = () => {
    if (index + 1 === positions.length) {
      setTrackIsActive(false);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Tab" && !(activeItem === positions.length - constraint)) {
      setActiveItem(index);
    }
  };

  return (
    <Flex
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      w={`${itemWidth}px`}
      _notLast={{
        mr: `${gap}px`
      }}
      py="4px"
    >
      {children}
    </Flex>
  );
};

export default ChakraCarousel;
