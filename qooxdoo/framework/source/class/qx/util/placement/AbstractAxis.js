/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Abstract class to compute the position of an object on one axis.
 */
qx.Class.define("qx.util.placement.AbstractAxis",
{
  extend : qx.core.Object,
  
  members :
  {
    /**
     * Computes the start of the object on the axis
     * 
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     */
    computeStart : function(size, target, offsets, areaSize, position) {
      throw new Error("abstract method call!");
    },
    
    
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     * 
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */    
    _moveToEdgeAndAlign : function(size, target, offsets, position)
    {
      switch(position)
      {
        case "edge-start":
          return target.start - offsets.start - size;
          
        case "edge-end":
          return target.end + offsets.end;
          
        case "align-start":
          return target.start;
          
        case "align-end":
          return target.end - size;
      }
    },
    
    
    /**
     * Whether the object specified by <code>start</code> and <code>size</code>
     * is completely inside of the axis' range..
     * 
     * @param start {Integer} Computed start position of the object
     * @param size {Integer} Size of the object
     * @param areaSize {Integer} The size of the axis
     * @return {Boolean} Whether the object is inside of the axis' range
     */
    _isInRange : function(start, size, areaSize) {
      return start >= 0 && start + size <= areaSize;
    }
  }
});