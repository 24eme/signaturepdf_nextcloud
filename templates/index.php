<?php

declare(strict_types=1);

use OCP\Util;

Util::addScript(OCA\SignaturePDF\AppInfo\Application::APP_ID, OCA\SignaturePDF\AppInfo\Application::APP_ID . '-main');
Util::addStyle(OCA\SignaturePDF\AppInfo\Application::APP_ID, OCA\SignaturePDF\AppInfo\Application::APP_ID . '-main');
?>

<div style="width: 100%;">
  <iframe data-token-url="/index.php/apps/signaturepdf_nextcloud/onetime_webauth_token" id="iframe_pdf" src="http://signaturepdf:9000/<?php p($_['signaturepdf_url']) ?>#dav:<?php p($_['pdf']); ?>" style="height: 100%; width: 100%"></iframe>
</div>

<!-- <div id="signaturepdf"></div> -->
