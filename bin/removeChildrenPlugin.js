/**
 *
 */
const removeChildrenPlugin = ($) => {
	$.prototype.removeChildren = function(selector) {
		this.find(selector).remove();
		return this;
	};
};

module.exports = removeChildrenPlugin;
