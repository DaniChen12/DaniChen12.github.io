var MarNode = function(img){ //等高響應節點類別
	this.node = img;
}

MarNode.prototype.mar = function(){
	var $img = this.node,
		$map = document.querySelector('[name="'+ $img.useMap.replace('#', '') +'"]'),
		$area = $map.querySelectorAll('area'),
		$area_length = $area.length;

	var _width = $img.naturalWidth;

	if( $img.style.width.match('px') ) {
		_width = parseInt($img.style.width, 10);
	}else if( $img.getAttribute('width') ) {
		_width = parseInt($img.getAttribute('width'), 10);
	}

	$img.style.height = "auto";
	
	window.addEventListener('resize', setRwd);

	if( _width !== $img.width ) {
		setRwd();
	}

	function setRwd() {
		
		var _size = $img.width / _width; // 圖片現在寬度
		
		for( var i = 0; i < $area_length; i++ ) { //根據比例計算相應的 coords
			var $this = $area[i],
				$coords = $this.getAttribute('data-coords');

			if( $coords === null ) { //紀錄最原始的定位在 data-coords
				var _orange = $this.coords;

				$this.setAttribute('data-coords', _orange);
				$coords = _orange;
			}

			$coords = $coords.split(','); //轉為陣列
			
			var $coords_len = $coords.length;

			for( var j = 0; j < $coords_len; j++ ) {
				$coords[j] = parseInt($coords[j], 10) * _size;
			}

			$this.coords = $coords.toString();
		}
	}
}