<?php

declare(strict_types=1);

namespace OCA\SignaturePDF\Listener;

use OCA\SignaturePDF\AppInfo\Application;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;
use OCA\SignaturePDF\Config\Config;

/**
 * @template-implements IEventListener<AddContentSecurityPolicyEvent>
 */
class CSPListener implements IEventListener {
	public function __construct(
		private Config $config,
	)
	{
	}

	public function handle(Event $event): void {
		if (!($event instanceof AddContentSecurityPolicyEvent)) {
			return;
		}

		$serverUrl = $this->config->getInstance();

		if (!$serverUrl) {
			return;
		}

		$csp = new ContentSecurityPolicy();
		$csp->addAllowedFrameDomain($serverUrl);
		$csp->addAllowedConnectDomain($serverUrl);
		$csp->addAllowedImageDomain($serverUrl);
		$csp->addAllowedScriptDomain($serverUrl);
		$csp->addAllowedFormActionDomain($serverUrl);

		$event->addPolicy($csp);
	}
}
