<?php

declare(strict_types=1);

use OCP\Util;

Util::addScript(OCA\SignaturePDF\AppInfo\Application::APP_ID, OCA\SignaturePDF\AppInfo\Application::APP_ID . '-main');
Util::addStyle(OCA\SignaturePDF\AppInfo\Application::APP_ID, OCA\SignaturePDF\AppInfo\Application::APP_ID . '-main');

?>

<div id="signaturepdf"></div>
